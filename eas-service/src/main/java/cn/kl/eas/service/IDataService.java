package cn.kl.eas.service;

import cn.kl.eas.entity.Data;


import java.util.List;

/**
 * Created by Administrator on 2017/6/16.
 */
public interface IDataService {
    List<Data> getAll();

    List<Data> getDataByIP(String ip);

    Data getOne(String ip);
}
