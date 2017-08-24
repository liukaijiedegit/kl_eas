package cn.kl.eas.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by Administrator on 2017/6/8.
 */
@Entity
@Table(name = "data")
public class Data {
    /**
     * id
     */
    @Id
    @GeneratedValue
    private Integer id;

    /**
     * 名称
     */
    @Column(name = "localip")
    private String localip;

    @Column(name = "time")
    private Timestamp time;

    @Column(name = "data")
    private String data;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLocalip() {
        return localip;
    }

    public void setLocalip(String localip) {
        this.localip = localip;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
