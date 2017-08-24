package cn.kl.eas.entity;

import javax.persistence.*;

/**
 * Created by kl272 on 2017/5/24.
 * 匹配出的事件
 */
@Entity
@Table(name = "event")
public class Event {
    /**
     * id
     */
    @Id
    @GeneratedValue
    private Integer id;

    /**
     * 名称
     */
    @Column(name = "event")
    private String event;

    /**
     * 事件描述
     */
    @Column(name = "des")
    private String des;

    /**
     * 标识
     */
    @Column(name = "eventid")
    private String eventid;

    /**
     * 类型
     * 0: 主机
     * 1: 网络
     */
    @Column(name = "eventtype")
    private Integer eventtype;

    /**
     * from
     */
    @Column(name = "from_node")
    private String from;

    /**
     * to
     */
    @Column(name = "to_node")
    private String to;

    /**
     * 输出信息
     */
    @Column(name = "content")
    private String content;

    /**
     * 数据项
     */
    @Column(name = "data_item")
    private String dataItem;

    /**
     * 数据源
     */
    @Column(name = "data_source")
    private String dataSource;

    /**
     * 匹配规则
     */
    @Column(name = "match_condition")
    private String MatchCondition;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public Integer getEventtype() {
        return eventtype;
    }

    public void setEventtype(Integer eventtype) {
        this.eventtype = eventtype;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getDataItem() {
        return dataItem;
    }

    public void setDataItem(String dataItem) {
        this.dataItem = dataItem;
    }

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    public String getEventid() {
        return eventid;
    }

    public void setEventid(String eventid) {
        this.eventid = eventid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getMatchCondition() {
        return MatchCondition;
    }

    public void setMatchCondition(String matchCondition) {
        MatchCondition = matchCondition;
    }
}
