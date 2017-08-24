package cn.kl.eas.entity;

import javax.persistence.*;

/**
 * Created by kl272 on 2017/5/24.
 * 数据源实体类
 */
@Entity
@Table(name = "data_source")
public class DataSource {

    /**
     * id
     */
    @Id
    @GeneratedValue
    private Integer id;

    /**
     * 名称
     */
    @Column(name = "name")
    private String name;


    /**
     * 标识
     */
    @Column(name = "token")
    private String token;

    /**
     * 配置文件内容
     */
    @Column(name = "config")
    private String config;


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getConfig() {
        return config;
    }

    public void setConfig(String config) {
        this.config = config;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
