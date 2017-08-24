package cn.kl.eas.web.controller;

import cn.kl.eas.entity.Event;
import cn.kl.eas.entity.webmsg.Result;
import cn.kl.eas.service.IEventService;
import cn.kl.eas.web.utils.MergeEntityUtil;
import cn.kl.eas.web.utils.ResultUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

/**
 * Created by Administrator on 2017/6/6.
 */
@RestController
@Api(tags = "EventApi", description = "事件")
public class EventController implements BaseController<Event> {

    @Autowired
    IEventService iEventService;

    @PostMapping("/v1/event")
    @ApiOperation(value = "添加事件")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "sEvent", value = "事件", dataType = "String", paramType = "body"),
    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "ok!", response = Event.class)
    })

    public Result saveCtrl(@RequestBody String sEvent) {
        Event event = JSON.parseObject(sEvent, Event.class);
        return ResultUtil.success(save(event));
    }

    @Override
    public Event save(Event entity) {
        return iEventService.save(entity);
    }


    @DeleteMapping("/v1/event/{event_id}")
    @ApiOperation(
            value = "删除事件")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "event_id", value = "事件id", dataType = "json", paramType = "path")
    })
    @ApiResponses({
            @ApiResponse(code = 204, message = "删除成功", response = void.class)
    })
    public Result deleteCtrl(@PathVariable("event_id") Integer event_id) {
        delete(event_id);
        return ResultUtil.success();
    }
    @Override
    public void delete(Integer id) {
        iEventService.delete(id);
    }


    @PutMapping("/v1/event")
    @ApiOperation(value = "更新事件")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "eventStr", value = "事件对象", dataType = "json", paramType = "body")
    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "更新成功", response = Event.class)
    })
    public Result updateCtrl(@RequestBody String eventStr ) throws IllegalAccessException {
        Event event = JSON.parseObject(eventStr, Event.class);
        Event per = iEventService.getOne(event.getId());
        Event event_ = (Event) MergeEntityUtil.merge(event, per, Event.class);
        return ResultUtil.success(update(event_));
    }

    @Override
    public Event update(Event entity) {
        return iEventService.update(entity);
    }


    @GetMapping("/v1/event/{event_id}")
    @ApiOperation(value = "根据id获取事件")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "event_id", value = "event id", dataType = "int", paramType = "path")
    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "获取成功", response = Event.class)
    })
    public Result getOneCtrl(@PathVariable("event_id") Integer event_id) {
        return ResultUtil.success(getOne(event_id));
    }

    @Override
    public Event getOne(Integer id) {
        return iEventService.getOne(id);
    }


    @GetMapping("/v1/event")
    @ApiOperation(value = "获取所有事件")
    @ApiResponses({
            @ApiResponse(code = 200, message = "获取成功", response = Event.class, responseContainer = "List")
    })
    public Result getAllCtrl() { return ResultUtil.success(getAll());}

    @Override
    public List<Event> getAll() {
        System.out.println(System.getProperty("user.dir") + "\\Rules\\");
        return iEventService.getAll();
    }

    @GetMapping("/v1/event/download")
    @ApiOperation(value = "下载所有事件")
    @ApiResponses({
            @ApiResponse(code = 200, message = "获取成功", response = Event.class, responseContainer = "List")
    })
    public void export(HttpServletResponse response) {
        try {
            String fileName = "event";// 文件名称
            response.setHeader("conent-type", "application/octet-stream");
            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; filename=" + new String(fileName.getBytes("ISO-8859-1"), "UTF-8"));

            OutputStream os = response.getOutputStream();
            BufferedOutputStream bos = new BufferedOutputStream(os);

            //拼接展示系统的 Event 格式
            List<Event> eventList = getAll();
            JSONArray events = new JSONArray(eventList.size());
            for (int i = 0; i < eventList.size(); i++) {
                JSONObject eventObj = new JSONObject();
                Event event = eventList.get(i);
                eventObj.put("id", event.getEventid());
                eventObj.put("name", event.getEvent());
                eventObj.put("description", event.getDes());
                events.add(eventObj);
            }

            InputStream is = new ByteArrayInputStream(JSONArray.toJSONString(events).getBytes());
            BufferedInputStream bis = new BufferedInputStream(is);

            int length = 0;
            byte[] temp = new byte[1 * 1024 * 10];

            while ((length = bis.read(temp)) != -1) {
                bos.write(temp, 0, length);
            }
            bos.flush();
            bis.close();
            bos.close();
            is.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
