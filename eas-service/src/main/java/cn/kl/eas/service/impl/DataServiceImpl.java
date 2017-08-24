package cn.kl.eas.service.impl;

import cn.kl.eas.dao.IDataRepo;
import cn.kl.eas.entity.Data;
import cn.kl.eas.service.IDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Created by Administrator on 2017/6/5.
 */
@Service
public class DataServiceImpl implements IDataService {

    @Autowired
    IDataRepo iDataRepo;


    @Override
    public List<Data> getAll() {
        return iDataRepo.findAll();
    }

    @Override
    public  List<Data> getDataByIP(String ip) {
        return iDataRepo.getDataByIP(ip);
    }

    @Override
    public Data getOne(String ip) {
        return iDataRepo.findOneByIP(ip);
    }
}
