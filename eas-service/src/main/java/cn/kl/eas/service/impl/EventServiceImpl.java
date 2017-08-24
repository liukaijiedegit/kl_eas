package cn.kl.eas.service.impl;

import cn.kl.eas.dao.IEventRepo;
import cn.kl.eas.entity.Event;
import cn.kl.eas.service.IEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Administrator on 2017/6/6.
 */
@Service
public class EventServiceImpl implements IEventService {
    @Autowired
    IEventRepo iEventRepo;

    @Transactional
    @Override
    public Event save(Event entity) {
        Event event = iEventRepo.save(entity);
        String evnetID = String.format("%s%04d", event.getDataSource(), event.getId());
        event.setEventid(evnetID);
        return iEventRepo.save(event);

    }

    @Override
    public void delete(Integer id) {
        iEventRepo.delete(id);
    }

    @Override
    public Event update(Event entity) {
        return iEventRepo.save(entity);
    }

    @Override
    public Event getOne(Integer id) {
        return iEventRepo.findOne(id);
    }

    @Override
    public List<Event> getAll() {
        return iEventRepo.findAll();
    }

    @Override
    public Event getOne(String eventid) {
        return iEventRepo.findOne(eventid);
    }
}
