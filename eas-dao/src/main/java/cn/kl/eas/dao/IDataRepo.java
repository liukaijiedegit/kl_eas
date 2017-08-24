package cn.kl.eas.dao;

import cn.kl.eas.entity.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by Administrator on 2017/6/8.
 */
public interface IDataRepo extends JpaRepository<Data, Integer> {
    @Query("select d from Data d where d.localip = ?1")
    List<Data> getDataByIP(String ip);

    @Query("select  d from Data d where d.localip = ?1 group by d.localip")
    Data findOneByIP(String ip);

    @Query(value = "select * from data as d where d.localip = ?1 and d.id > ?2 and d.data like %?3% ORDER BY id DESC  LIMIT 5",  nativeQuery = true)
    List<Data> getData(String ip, Integer data_id, String type);
}
