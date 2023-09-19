package com.sisp.controller;

import com.sisp.beans.HttpResponseEntity;
import com.sisp.dao.entity.UserEntity;
import com.sisp.redis.cache.CacheService;
import com.sisp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 用户登录
     */
    @RequestMapping(value = "/userLogin", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity userLogin(@RequestBody UserEntity userEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            List<UserEntity> hasUser = userService.selectUserInfo(userEntity);
            if (CollectionUtils.isEmpty(hasUser)){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("用户名或密码错误");
                httpResponseEntity.setData(hasUser.get(0));
            }
            else{
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(hasUser);
                httpResponseEntity.setMassage("登录成功");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 用户列表查询
     */
    @RequestMapping(value = "/queryUserList", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryUserList(@RequestBody UserEntity userEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            List<UserEntity> hasUser = userService.queryUserList(userEntity);
            if (CollectionUtils.isEmpty(hasUser)){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("无用户信息");
                httpResponseEntity.setData(hasUser.get(0));
            }
            else{
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(hasUser);
                httpResponseEntity.setMassage("查询成功");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 创建用户基本信息
     */
    @RequestMapping(value = "/addUserInfo", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity addUser(@RequestBody UserEntity userEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            userService.deleteUserByName(userEntity);
            userEntity.setStatus("1");
            int result = userService.addUserinfo(userEntity);
            if (result != 0){
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMassage("创建成功");
            }
            else{
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("创建失败");
                httpResponseEntity.setData(0);
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 修改用户基本信息
     */
    @RequestMapping(value = "/modifyUser", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity modifyUser(@RequestBody UserEntity userEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            int result = userService.modifyUserInfo(userEntity);
            if (result != 0){
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMassage("修改成功");
            }
            else{
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("修改失败");
                httpResponseEntity.setData(0);
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 修改用户基本信息
     */
    @RequestMapping(value = "/deleteUserInfo", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity deleteUserInfo(@RequestBody UserEntity userEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        System.out.println(userEntity.toString());
        try {
            int result = userService.deleteUserByName(userEntity);
            if (result != 0){
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMassage("删除成功");
            }
            else{
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("删除失败");
                httpResponseEntity.setData(0);
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }
}
