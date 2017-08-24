package cn.kl.eas.service;

import cn.kl.eas.entity.Rules;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.util.List;

/**
 * Created by Administrator on 2017/6/6.
 */
public interface IRulesService {

    /**
     * 添加匹配规则
     * @param entity
     * @return
     */
    Rules save(Rules entity, InputStream is) throws Exception;

    /**
     * 删除规则
     * @param id
     */
    void delete(Integer id);

    /**
     * 更新规则
     * @param entity
     * @return
     */
    Rules update(Rules entity, InputStream is) throws IOException;

    Rules update(Rules rules) throws ClassNotFoundException, NoSuchMethodException, MalformedURLException;

    /**
     * 获取所有规则
     * @return
     */
    List<Rules> getAll();

    Rules getOne(Integer id);
}
