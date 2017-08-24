package cn.kl.eas.web.controller;


import java.net.MalformedURLException;
import java.util.List;

/**
 * Created by kl272 on 2017/5/9.
 * E Controller对应的实体
 */
public interface BaseController<E> {

    /**
     * @param entity 实体entity
     * @return 保存成功后，返回带有id实体entity
     */
    E save(E entity);

    /**
     * @param id 主键id
     */
    void delete(Integer id);

    /**
     * @param entity 实体entity
     * @return 更新成功后，返回更新后的entity
     */
    E update(E entity) throws NoSuchMethodException, MalformedURLException, ClassNotFoundException;

    /**
     * @param id 主键id
     * @return 实体entity
     */
    E getOne(Integer id);

    /**
     * @return 返回表中所有记录
     */
    List<E> getAll();






}
