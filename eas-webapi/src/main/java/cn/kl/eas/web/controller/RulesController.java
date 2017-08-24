package cn.kl.eas.web.controller;

import cn.kl.eas.entity.Rules;
import cn.kl.eas.entity.webmsg.Result;
import cn.kl.eas.service.IRulesService;
import cn.kl.eas.web.common.enums.ResultEnum;
import cn.kl.eas.web.utils.MergeEntityUtil;
import cn.kl.eas.web.utils.ResultUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.util.List;

/**
 * Created by Administrator on 2017/6/6.
 */
@RestController
@Api(tags = "RulesApi", description = "规则")
public class RulesController implements BaseController<Rules> {

    @Autowired
    IRulesService iRulesService;

    /**
     * 上传
     */
    @PostMapping("/v1/rules/upload")
    @ApiOperation(value = "上传", consumes = "- multipart/form-data")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "file", value = "jar包", required = true, dataType = "file", paramType = "form")
    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "ok!", response = Rules.class)
    })

    public Result uploadCtrl(MultipartFile file) throws Exception {
        Rules rules = new Rules();
        rules.setClasspath(file.getOriginalFilename());
        return ResultUtil.success(save(rules, file.getInputStream()));
    }


    /**
     * 添加匹配规则
     */
    @PostMapping("/v1/rules")
    @ApiOperation(value = "添加匹配规则", consumes = "- multipart/form-data")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "str_rules", value = "匹配规则", dataType = "String", paramType = "query"),
            @ApiImplicitParam(name = "file", value = "jar包", required = true, dataType = "file", paramType = "form")
    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "ok!", response = Rules.class)
    })
    @ApiIgnore
    @Deprecated
    public Result saveCtrl(@RequestParam String str_rules, MultipartFile file) {
        try {
            Rules rules = JSON.parseObject(str_rules, Rules.class);
            rules.setClasspath(file.getOriginalFilename());
            Rules result = save(rules, file.getInputStream());
            return ResultUtil.success(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResultUtil.error(ResultEnum.UPLOAD_RULES_ERROR.getMsg());
        }
    }

    public Rules save(Rules entity, InputStream is) throws Exception  {
        return iRulesService.save(entity, is);
    }

    @Override
    @Deprecated
    public Rules save(Rules entity) {return null;}

    /**
     * 删除规则
     * @param rules_id 主键id
     */
    @DeleteMapping("/v1/rules/{rules_id}")
    @ApiOperation(
            value = "删除规则")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "rules_id", value = "规则id", dataType = "json", paramType = "path")
    })
    @ApiResponses({
            @ApiResponse(code = 204, message = "删除成功", response = void.class)
    })
    public Result deleteCtrl(@PathVariable("rules_id") Integer rules_id) {
        delete(rules_id);
        return ResultUtil.success();
    }

    @Override
    public void delete(Integer id) {
        iRulesService.delete(id);
    }

    /**
     * 更新规则
     * @param
     * @return
     */
//    @PutMapping("/v1/rules")
//    @ApiOperation(value = "更新规则")
//    @ApiImplicitParams({
//            @ApiImplicitParam(name = "rules", value = "rule对象", dataType = "json", paramType = "body"),
//            @ApiImplicitParam(name = "file", value = "jar包", required = true, dataType = "file", paramType = "form")
//    })
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "更新成功", response = Rules.class)
//    })
//    public Result updateCtrl(@RequestBody Rules rules, MultipartFile file) throws Exception{
//        return ResultUtil.success(update(rules, file.getInputStream()));
//    }
//
//    public Rules update(Rules entity, InputStream is) throws IOException {
//        return iRulesService.update(entity, is);
//    }


    /**
     * 更新，不上传文件
     */
    @PutMapping("/v1/rules")
    @ApiOperation(value = "更新规则")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "rules", value = "rule对象", dataType = "Rule", paramType = "body")
    })
    public Result updateCtrl(@RequestBody Rules rules) throws IllegalAccessException, NoSuchMethodException, ClassNotFoundException, MalformedURLException {
        Rules rules1 = iRulesService.getOne(rules.getId());
        Rules merge = (Rules) MergeEntityUtil.merge(rules, rules1, Rules.class);
        return ResultUtil.success(update(merge));
    }

    @Override
    public Rules update(Rules rules) throws NoSuchMethodException, MalformedURLException, ClassNotFoundException {
        return iRulesService.update(rules);
    }

    @Override
    @Deprecated
    public Rules getOne(Integer id) {
        return null;
    }

    /**
     * 获取所有规则
     * @return
     */

    @GetMapping("/v1/rules")
    @ApiOperation(value = "获取所有规则")
    @ApiResponses({
            @ApiResponse(code = 200, message = "获取成功", response = Rules.class, responseContainer = "List")
    })

    public Result getAllCtrl() {
        return ResultUtil.success(getAll());
    }

    @Override
    public List<Rules> getAll() {
        return iRulesService.getAll();
    }
}
