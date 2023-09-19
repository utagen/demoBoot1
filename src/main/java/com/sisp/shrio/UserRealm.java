package com.sisp.shrio;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import com.sisp.service.UserService;
import com.sisp.dao.entity.UserEntity;
import org.apache.shiro.util.ByteSource;

import javax.annotation.Resource;
import javax.jws.soap.SOAPBinding;

public class UserRealm extends AuthorizingRealm {

    @Resource
    private UserService accountService;
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        // 从authenticationToken中获取用户提交的username
        String accountName = (String) authenticationToken.getPrincipal();
        // 通过username查询到对应的用户信息
        UserEntity user = new UserEntity();
        user.setStatus(accountName);
        UserEntity accountInfo = (UserEntity) accountService.selectUserInfo(user);
        if (accountInfo == null) {
            return null;
        }
        // 取出查询到的用户密码
        String password = accountInfo.getPassword();
        // 取出用户密码加密需要用到的盐值
        String salt = accountInfo.getId();
        // 把查询出来的用户信息、密码、加密盐值、Realm名称包装进SimpleAuthenticationInfo返回
        return new SimpleAuthenticationInfo(accountInfo, password, ByteSource.Util.bytes(salt), getName());
    }

    // 这个方法是在用户登陆成功后，调用需要权限才能访问的接口时才来鉴定权限
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        // 拿到已经登陆的用户信息
        UserEntity accountInfo = (UserEntity) principalCollection.getPrimaryPrincipal();
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        // 下面的角色和权限需要从数据库中查询
        // 设置角色
        authorizationInfo.addRole("User");
        // 设置权限
        authorizationInfo.addStringPermission("User:read");
        // 返回角色和权限
        return authorizationInfo;
    }
}
