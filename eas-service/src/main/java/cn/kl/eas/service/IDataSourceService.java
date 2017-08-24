package cn.kl.eas.service;

import cn.kl.eas.entity.DataSource;

import java.io.InputStream;
import java.util.List;

/**
 * Created by Administrator on 2017/6/5.
 */
public interface IDataSourceService {
    /**
     * 上传数据源配置文件
     * @param is
     * @return
     */
    DataSource upload(Integer id, InputStream is) throws Exception;

    /**
     * 删除数据源
     * @param id
     */
    void delete(Integer id);

    /**
     * 获取所有数据源
     * @return
     */
    List<DataSource> getAll();
}
