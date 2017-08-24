package cn.kl.eas.dao;

import cn.kl.eas.entity.DataSource;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by kl272 on 2017/5/25.
 */
public interface IDataSourceRepo extends JpaRepository<DataSource, Integer> {
}
