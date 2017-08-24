package cn.kl.eas.dao;

import cn.kl.eas.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by Administrator on 2017/6/6.
 */
public interface IEventRepo extends JpaRepository<Event, Integer> {
    @Query("select e from Event e where e.eventid = ?1")
    Event findOne(String eventID);
}
