package cn.kl.eas.service;

import cn.kl.eas.entity.Event;

import java.util.List;

/**
 * Created by Administrator on 2017/6/6.
 */
public interface IEventService {

    /**
     * 添加一个事件
     * @param entity
     * @return
     */
    Event save(Event entity);

    /**
     * 删除一个事件
     * @param id
     */
    void delete(Integer id);


    /**
     * 修改一个事件
     * @param entity
     * @return
     */
    Event update(Event entity);

    /**
     * 获取一个事件
     * @param id
     * @return
     */
    Event getOne(Integer id);

    /**
     *
     * @param eventid
     * @return
     */
    Event getOne(String eventid);

    /**
     * 获取所有事件
     * @return
     */
    List<Event> getAll();
}
