/*
Navicat MySQL Data Transfer

Source Server         : 25
Source Server Version : 50544
Source Host           : 172.10.32.25:3306
Source Database       : kl_eas

Target Server Type    : MYSQL
Target Server Version : 50544
File Encoding         : 65001

Date: 2017-07-03 14:56:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for data
-- ----------------------------
DROP TABLE IF EXISTS `data`;
CREATE TABLE `data` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增id',
  `localip` varchar(32) NOT NULL COMMENT '事件发生的主机ip',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '采集时间',
  `data` longtext COMMENT '采集信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for data_source
-- ----------------------------
DROP TABLE IF EXISTS `data_source`;
CREATE TABLE `data_source` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增id',
  `name` varchar(255) DEFAULT NULL COMMENT '数据源名称',
  `config` longtext COMMENT '数据源配置',
  `token` varchar(255) DEFAULT NULL COMMENT '数据源标识',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of data_source
-- ----------------------------
INSERT INTO `data_source` VALUES ('1', '艺赛琪', '{    \"ID\":\"YSQ1\",    \"key\":\"vda_log_type\",    \"name\":\"艺赛琪\",    \"keys\":    {        \"终端信息\": \"1\",        \"系统基础\": \"2\",        \"网络连接\": \"3\",        \"文件操作\": \"4\",        \"应用进程\": \"5\",        \"Web应用系统\": \"6\",        \"邮件\": \"7\",        \"文件传输\": \"8\",        \"网卡信息\": \"9\"                },    \"1\":    {        \"系统会话号\":        {            \"type\":0,            \"key\":\"vda_sid\"        },        \"录像存储位置\":        {            \"type\":0,            \"key\":\"vda_spath\"        },        \"录像帧号\":        {            \"type\":0,            \"key\":\"vda_frame_index\"        },        \"操作时间\":        {            \"type\":0,            \"key\":\"vda_op_time\"        },        \"远程IP\":        {            \"type\":0,            \"key\":\"vda_remote_ip\"        },        \"当前操作桌面IP\":        {            \"type\":0,            \"key\":\"vda_local_ip\"        },        \"系统登录账号\":        {            \"type\":0,            \"key\":\"vda_login_acc\"        },        \"营业厅/地域\":        {            \"type\":0,            \"key\":\"vda_gpath\"        },        \"登录登出动作\":        {            \"type\":1,            \"key\":\"vda_op\",            \"values\":            {                \"登录\":\"1\",                \"登出\":\"2\",                \"锁屏\":\"3\"            }        }    },    \"2\":    {        \"系统会话号\":        {            \"type\":0,            \"key\":\"vda_sid\"        },        \"录像存储位置\":        {            \"type\":0,            \"key\":\"vda_spath\"        },        \"录像帧号\":        {            \"type\":0,            \"key\":\"vda_frame_index\"        },        \"操作时间\":        {            \"type\":0,            \"key\":\"vda_op_time\"        },        \"远程IP\":        {            \"type\":0,            \"key\":\"vda_remote_ip\"        },        \"当前操作桌面IP\":        {            \"type\":0,            \"key\":\"vda_local_ip\"        },        \"系统登录账号\":        {            \"type\":0,            \"key\":\"vda_login_acc\"        },        \"营业厅/地域\":        {            \"type\":0,            \"key\":\"vda_gpath\"        },        \"行为子类型\":        {            \"type\":1,            \"key\":\"vda_sub_type\",            \"values\":            {                \"进程操作\":\"1\",                \"窗口操作\":\"2\",                \"URL访问\":\"3\"            }        },        \"进程/窗口操作\":        {            \"type\":1,            \"key\":\"vda_op\",            \"values\":            {                \"打开\":\"1\",                \"关闭\":\"2\"            }        },        \"内存\":        {            \"type\":0,            \"key\":\"vda_mem_info\"        },        \"操作内容\":        {            \"type\":0,            \"key\":\"vda_content\"        }    },    \"3\":    {        \"系统会话号\":        {            \"type\":0,            \"key\":\"vda_sid\"        },        \"录像存储位置\":        {            \"type\":0,            \"key\":\"vda_spath\"        },        \"录像帧号\":        {            \"type\":0,            \"key\":\"vda_frame_index\"        },        \"操作时间\":        {            \"type\":0,            \"key\":\"vda_op_time\"        },        \"远程IP\":        {            \"type\":0,            \"key\":\"vda_remote_ip\"        },        \"当前操作桌面IP\":        {            \"type\":0,            \"key\":\"vda_local_ip\"        },        \"系统登录账号\":        {            \"type\":0,            \"key\":\"vda_login_acc\"        },        \"营业厅/地域\":        {            \"type\":0,            \"key\":\"vda_gpath\"        },        \"连接信息\":        {            \"type\":2,            \"key\":\"vda_tcp_info\",            \"keys\":            {                \"本地地址\":                {                    \"type\":0,                    \"key\":\"vda_sip\"                },                \"本地端口\":                {                    \"type\":0,                    \"key\":\"vda_sport\"                },                \"外部地址\":                {                    \"type\":0,                    \"key\":\"vda_dip\"                },                \"外部端口\":                {                    \"type\":0,                    \"key\":\"vda_dport\"                }            }        }    },    \"4\":    {        \"系统会话号\":        {            \"type\":0,            \"key\":\"vda_sid\"        },        \"录像存储位置\":        {            \"type\":0,            \"key\":\"vda_spath\"        },        \"录像帧号\":        {            \"type\":0,            \"key\":\"vda_frame_index\"        },        \"操作时间\":        {            \"type\":0,            \"key\":\"vda_op_time\"        },        \"远程IP\":        {            \"type\":0,            \"key\":\"vda_remote_ip\"        },        \"当前操作桌面IP\":        {            \"type\":0,            \"key\":\"vda_local_ip\"        },        \"系统登录账号\":        {            \"type\":0,            \"key\":\"vda_login_acc\"        },        \"营业厅/地域\":        {            \"type\":0,            \"key\":\"vda_gpath\"        },        \"U盘操作\":        {            \"type\":1,            \"key\":\"vda_udisk\",            \"values\":            {                \"不是\":\"0\",                \"是\":\"1\"            }        },        \"操作\":        {            \"type\":1,            \"key\":\"vda_op\",            \"values\":            {                \"文件新建\":\"1\",                \"文件复制\":\"2\",                \"文件删除\":\"3\",                \"文件修改\":\"4\",                \"文件重命名\":\"5\",                \"U盘外设挂载信息\":\"6\",                \"U盘外设卸载信息\":\"7\",                \"打印\":\"8\"            }        },        \"源文件路径\":        {            \"type\":0,            \"key\":\"vda_file_src_path\"        },        \"目标文件路径\":        {            \"type\":0,            \"key\":\"vda_file_src_path\"        }    },    \"5\":    {        \"系统会话号\":        {            \"type\":0,            \"key\":\"vda_sid\"        },        \"录像存储位置\":        {            \"type\":0,            \"key\":\"vda_spath\"        },        \"录像帧号\":        {            \"type\":0,            \"key\":\"vda_frame_index\"        },        \"操作时间\":        {            \"type\":0,            \"key\":\"vda_op_time\"        },        \"远程IP\":        {            \"type\":0,            \"key\":\"vda_remote_ip\"        },        \"当前操作桌面IP\":        {            \"type\":0,            \"key\":\"vda_local_ip\"        },        \"系统登录账号\":        {            \"type\":0,            \"key\":\"vda_login_acc\"        },        \"营业厅/地域\":        {            \"type\":0,            \"key\":\"vda_gpath\"        },        \"操作会话号\":        {            \"type\":0,            \"key\":\"vda_ssid\"        },        \"应用类型\":        {            \"type\":1,            \"key\":\"vda_app_type\",            \"values\":            {                \"cmd\":\"0\",                \"db\":\"1\"            }        },        \"响应进程名称\":        {            \"type\":0,            \"key\":\"vda_app_name\"        },        \"操作类型\":        {            \"type\":1,            \"key\":\"vda_op\",            \"values\":            {                \"标识会话开始\":\"1\",                \"会话中正在输入命令\":\"2\",                \"标识会话结束\":\"3\",                \"会话中正在输入用户名\":\"4\"            }                    },        \"目标资源ip\":        {            \"type\":0,            \"key\":\"vda_res_ip\"        },        \"目标资源连接协议\":        {            \"type\":0,            \"key\":\"vda_res_protocol\"        },        \"目标资源账号\":        {            \"type\":0,            \"key\":\"vda_res_acc\"        },        \"操作命令\":        {            \"type\":0,            \"key\":\"vda_cmd\"        }    },    \"6\":    {        \"系统会话号\":        {            \"type\":0,            \"key\":\"vda_sid\"        },        \"录像存储位置\":        {            \"type\":0,            \"key\":\"vda_spath\"        },        \"录像帧号\":        {            \"type\":0,            \"key\":\"vda_frame_index\"        },        \"操作时间\":        {            \"type\":0,            \"key\":\"vda_op_time\"        },        \"远程IP\":        {            \"type\":0,            \"key\":\"vda_remote_ip\"        },        \"当前操作桌面IP\":        {            \"type\":0,            \"key\":\"vda_local_ip\"        },        \"系统登录账号\":        {            \"type\":0,            \"key\":\"vda_login_acc\"        },        \"营业厅/地域\":        {            \"type\":0,            \"key\":\"vda_gpath\"        },        \"应用会话session_id\":        {            \"type\":0,            \"key\":\"vda_ssid\"        },        \"请求id和响应头,体(html)文件关联\":        {            \"type\":0,            \"key\":\"vda_request_id\"        },        \"浏览器名称(IE,Chrome)\":        {            \"type\":0,            \"key\":\"vda_browser_name\"        },        \"浏览器版本\":        {            \"type\":0,            \"key\":\"vda_browser_version\"        },        \"协议\":        {            \"type\":0,            \"key\":\"vda_proto\"        },        \"浏览器名称\":        {            \"type\":0,            \"key\":\"vda_browser_name\"        },        \"操作方式\":        {            \"type\":0,            \"key\":\"vda_method\"        },        \"操作响应时长\":        {            \"type\":0,            \"key\":\"vda_response_duration\"        },        \"业务系统id\":        {            \"type\":0,            \"key\":\"vda_app_seq\"        },        \"WEB URL定义的业务属性ID\":        {            \"type\":0,            \"key\":\"vda_url_seq\"        },        \"应用系统服务域名\":        {            \"type\":0,            \"key\":\"vda_app_svr_domain\"        },        \"应用系统服务端口\":        {            \"type\":0,            \"key\":\"vda_app_svr_port\"        },        \"网页URL\":        {            \"type\":0,            \"key\":\"vda_url\"        },        \"下载文件名称\":        {            \"type\":0,            \"key\":\"vda_response_filename\"        },        \"上传文件名称\":        {            \"type\":0,            \"key\":\"vda_upload_filename\"        },        \"URL参数\":        {            \"type\":0,            \"key\":\"vda_url_arg\"        },        \"POST参数\":        {            \"type\":0,            \"key\":\"vda_post_data\"        },        \"COOKIE原始值\":        {            \"type\":0,            \"key\":\"vda_cookie_raw\"        },        \"操作请求信息\":        {            \"type\":2,            \"key\":\"vda_request_info\",            \"keys\":            {                \"提取项ID\":                {                    \"type\":0,                    \"key\":\"id\"                },                \"提取对象\":                {                    \"type\":0,                    \"key\":\"k\"                },                \"提取内容\":                {                    \"type\":0,                    \"key\":\"v\"                }            }        },        \"应用系统账号\":        {            \"type\":0,            \"key\":\"vda_app_acc\"        },        \"请求头信息开关标识\":        {            \"type\":1,            \"key\":\"vda_html_header\",            \"values\":            {                \"关闭\":0,                \"开启\":1            }        },        \"HTML开关标识\":        {            \"type\":1,            \"key\":\"vda_html\",            \"values\":            {                \"关闭\":0,                \"开启\":1            }        },        \"提取页面文本内容标识\":        {            \"type\":1,            \"key\":\"vda_html_txt\",            \"values\":            {                \"关闭\":0,                \"开启\":1            }        }    },    \"7\":    {        \"系统会话号\":        {            \"type\":0,            \"key\":\"vda_sid\"        },        \"录像存储位置\":        {            \"type\":0,            \"key\":\"vda_spath\"        },        \"录像帧号\":        {            \"type\":0,            \"key\":\"vda_frame_index\"        },        \"操作时间\":        {            \"type\":0,            \"key\":\"vda_op_time\"        },        \"远程IP\":        {            \"type\":0,            \"key\":\"vda_remote_ip\"        },        \"当前操作桌面IP\":        {            \"type\":0,            \"key\":\"vda_local_ip\"        },        \"系统登录账号\":        {            \"type\":0,            \"key\":\"vda_login_acc\"        },        \"营业厅/地域\":        {            \"type\":0,            \"key\":\"vda_gpath\"        },        \"应用名称(foxmail,outlook)\":        {            \"type\":0,            \"key\":\"vda_app_name\"        },        \"操作动作\":        {            \"type\":1,            \"key\":\"vda_op\",            \"values\":            {                \"发送\":1,                \"接收\":2            }        },        \"发件人\":        {            \"type\":0,            \"key\":\"vda_from_name\"        },        \"收件人\":        {            \"type\":0,            \"key\":\"vda_to_name\"        },        \"抄送人\":        {            \"type\":0,            \"key\":\"vda_cc_name\"        },        \"密送人\":        {            \"type\":0,            \"key\":\"vda_bcc_name\"        },        \"邮件主题\":        {            \"type\":0,            \"key\":\"vda_mail_subject\"        },        \"附件名称\":        {            \"type\":3,            \"key\":\"vda_mail_app\",            \"keys\":            {                \"附件名称\":                {                    \"type\":0,                    \"key\":\"vda_app_name\"                }            }        }    },    \"8\":    {        \"系统会话号\":        {            \"type\":0,            \"key\":\"vda_sid\"        },        \"录像存储位置\":        {            \"type\":0,            \"key\":\"vda_spath\"        },        \"录像帧号\":        {            \"type\":0,            \"key\":\"vda_frame_index\"        },        \"操作时间\":        {            \"type\":0,            \"key\":\"vda_op_time\"        },        \"远程IP\":        {            \"type\":0,            \"key\":\"vda_remote_ip\"        },        \"当前操作桌面IP\":        {            \"type\":0,            \"key\":\"vda_local_ip\"        },        \"系统登录账号\":        {            \"type\":0,            \"key\":\"vda_login_acc\"        },        \"营业厅/地域\":        {            \"type\":0,            \"key\":\"vda_gpath\"        },        \"本地IP\":        {            \"type\":0,            \"key\":\"vda_ftp_sip\"        },        \"目标IP\":        {            \"type\":0,            \"key\":\"vda_ftp_dip\"        },        \"用户名\":        {            \"type\":0,            \"key\":\"vda_ftp_uid\"        },        \"传输方式(云盘/网盘,WinSCP,FileZilla)\":        {            \"type\":0,            \"key\":\"vda_app_name\"        },        \"操作动作\":        {            \"type\":1,            \"key\":\"vda_op\",            \"values\":            {                \"上传\":\"1\",                \"下载\":\"2\"            }        },        \"本地路径\":        {            \"type\":0,            \"key\":\"vda_local_path\"        },        \"目标路径\":        {            \"type\":0,            \"key\":\"vda_dst_path\"        },        \"传输文件名\":        {            \"type\":0,            \"key\":\"vda_filename\"        },        \"传输文件大小\":        {            \"type\":0,            \"key\":\"vda_filesize\"        }    },    \"9\":    {        \"系统会话号\":        {            \"type\":0,            \"key\":\"vda_sid\"        },        \"录像存储位置\":        {            \"type\":0,            \"key\":\"vda_spath\"        },        \"录像帧号\":        {            \"type\":0,            \"key\":\"vda_frame_index\"        },        \"操作时间\":        {            \"type\":0,            \"key\":\"vda_op_time\"        },        \"远程IP\":        {            \"type\":0,            \"key\":\"vda_remote_ip\"        },        \"当前操作桌面IP\":        {            \"type\":0,            \"key\":\"vda_local_ip\"        },        \"系统登录账号\":        {            \"type\":0,            \"key\":\"vda_login_acc\"        },        \"营业厅/地域\":        {            \"type\":0,            \"key\":\"vda_gpath\"        },        \"网卡信息\":        {            \"type\":2,            \"key\":\"vda_nic_info\",            \"keys\":            {                \"网卡名称\":                {                    \"type\":0,                    \"key\":\"vda_name\"                },                \"MAC地址\":                {                    \"type\":0,                    \"key\":\"vda_mac\"                },                \"已发送(KB)\":                {                    \"type\":0,                    \"key\":\"vda_send\"                },                \"已接受(KB)\":                {                    \"type\":0,                    \"key\":\"vda_recv\"                }            }        }    }}', 'YSQ1');

-- ----------------------------
-- Table structure for event
-- ----------------------------
DROP TABLE IF EXISTS `event`;
CREATE TABLE `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增id',
  `event` varchar(255) DEFAULT NULL COMMENT '事件名称',
  `des` varchar(255) DEFAULT NULL COMMENT '事件描述',
  `eventid` varchar(255) DEFAULT NULL COMMENT '事件标识--事件ID',
  `eventtype` int(11) DEFAULT NULL COMMENT '事件类型0: 主机，1: 网络',
  `from_node` varchar(255) DEFAULT NULL COMMENT 'fromNode节点标识',
  `content` varchar(255) DEFAULT NULL COMMENT '输出信息',
  `data_item` varchar(255) DEFAULT NULL COMMENT '数据项',
  `data_source` varchar(255) DEFAULT NULL COMMENT '数据源',
  `match_condition` longtext COMMENT '匹配规则',
  `to_node` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of event
-- ----------------------------
INSERT INTO `event` VALUES ('1', 'e1', 'e1', 'YSQ10046', '1', '{\"key\":\"vda_sid\",\"type\":\"0\"}', '阿斯顿撒', '1', 'YSQ1', '[{\"des\":\"系统会话号\",\"name\":\"\",\"MatchRules\":\"阿斯达所多\",\"type\":\"0\",\"value\":\"\",\"key\":\"vda_sid\"},{\"des\":\"录像存储位置\",\"name\":\"\",\"MatchRules\":\"阿斯达所多\",\"type\":\"0\",\"value\":\"\",\"key\":\"vda_spath\"},{\"MatchRules\":\"==\",\"type\":0,\"value\":\"1\",\"key\":\"vda_log_type\"}]', '{\"key\":\"vda_sid\",\"type\":\"0\"}');

-- ----------------------------
-- Table structure for rules
-- ----------------------------
DROP TABLE IF EXISTS `rules`;
CREATE TABLE `rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增id',
  `name` varchar(255) DEFAULT NULL COMMENT '规则名称',
  `info` varchar(255) DEFAULT NULL COMMENT '规则描述',
  `classpath` varchar(255) DEFAULT NULL COMMENT '上传的jar路径--文件名',
  `enabled` tinyint(1) DEFAULT '1' COMMENT '是否可用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
