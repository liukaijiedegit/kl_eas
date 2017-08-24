package cn.kl.eas.entity;

import javax.persistence.*;

/**
 * Created by kl272 on 2017/5/24.
 * 知识点，可以称为算法，或者匹配规则
 */
@Entity
@Table(name = "rules")
public class Rules {

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
     * 描述
     */
    @Column(name = "info")
    private String info;

    /**
     * 上传的jar路径----------------文件名
     */
    @Column(name = "classpath")
    private String classpath;

    /**
     * 是否可用
     */
    @Column(name = "enabled")
    private boolean enabled;


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

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getClasspath() {
        return classpath;
    }

    public void setClasspath(String classpath) {
        this.classpath = classpath;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
