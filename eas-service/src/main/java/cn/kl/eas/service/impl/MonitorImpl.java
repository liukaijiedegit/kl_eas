package cn.kl.eas.service.impl;

import cn.kl.eas.dao.IDataRepo;
import cn.kl.eas.entity.Data;
import cn.kl.eas.service.IMonitor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/7/6.
 */
@Service
public class MonitorImpl implements IMonitor{

    @Autowired
    IDataRepo iDataRepo;

    @Override
    public List<Data> getData(String ip, Integer data_id, String type) {
        return iDataRepo.getData(ip, data_id, type);
    }
}
