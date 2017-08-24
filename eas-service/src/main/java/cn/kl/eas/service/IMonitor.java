package cn.kl.eas.service;

import cn.kl.eas.entity.Data;
import java.util.List;

/**
 * Created by Administrator on 2017/7/6.
 */

public interface IMonitor {
    List<Data> getData(String ip, Integer data_id, String type);
}
