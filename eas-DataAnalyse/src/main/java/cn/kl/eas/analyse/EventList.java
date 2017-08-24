package cn.kl.eas.analyse;

import cn.kl.eas.dao.IEventRepo;
import cn.kl.eas.entity.Event;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/6/7.
 */
@Component
public class EventList {
    @Autowired
    IEventRepo iEventRepo;

    //待解析的事件列表
    static List<String> events = new ArrayList<String>();

    //事件与项目对应关系
    static Map<String, List<String>> mapEvent = new HashMap<String, List<String>>();

    //事件ID与事件信息对应关系
    static Map<String, String> mapEventID2Event = new HashMap<String, String>();

    public List<String> find(String eventID) {
        return mapEvent.get(eventID);
    }

    public void add(String eventID, String project) {
        List<String> projects = new ArrayList<String>();
        boolean bFlag = true;

        //先判断该事件是否已经存在
        synchronized (mapEvent) {
            if ( mapEvent.containsKey(eventID) ) {

                //已经存在
                projects = mapEvent.get(eventID);
                bFlag = false;
            }

            //将项目添加到事件对应的项目列表
            if ( projects.indexOf(project) == -1 ) {
                projects.add(project);
                mapEvent.put(eventID, projects);
            }

        }

        //事件不存在于mapEvent中，需要将事件信息查询
        if (bFlag) {
            Event event = iEventRepo.findOne(eventID);
            JSONObject jEvent = new JSONObject();
            jEvent.put("EventID", event.getEventid());
            jEvent.put("EventType", event.getEventtype());
            jEvent.put("FromField", event.getFrom());
            jEvent.put("ToField", event.getTo());
            jEvent.put("Content", event.getContent());
            jEvent.put("MatchCondition", event.getMatchCondition());

            //将配置好格式的事件信息 加入到 待解析事件列表中
            synchronized(events) {
                events.add(jEvent.toJSONString());
                mapEventID2Event.put(event.getEventid(), jEvent.toJSONString());
            }
        }
    }

    public List<String> getEvents () {
        return events;
    }

    public List<String> getProjects(String eventID) {
        return mapEvent.get(eventID);
    }

    public void delete(String project) {
        List<String> deleteEvent = new ArrayList<String>();
        for (Map.Entry<String, List<String>> it : mapEvent.entrySet()) {
            List<String> projects = it.getValue();
            projects.remove(project);

            if (projects.isEmpty()) {
                deleteEvent.add(it.getKey());
            }
        }

        for (String eventID : deleteEvent) {
            mapEvent.remove(eventID);
            events.remove(mapEventID2Event.get(eventID));
        }
    }
}
