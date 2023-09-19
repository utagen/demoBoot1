package com.sisp.shrio;

import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.context.annotation.Bean;

import java.util.LinkedHashMap;
import java.util.Map;

public class Config {
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean() {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
 // 设置securityManager，负责权限验证的核心事务处理。
        shiroFilterFactoryBean.setSecurityManager(securityManager());
 // 配置过滤器链
        Map<String, String> filterChainDefinitionMap = new LinkedHashMap<>();
 // anon表示该url不需要经过权限验证
        filterChainDefinitionMap.put("/static/**", "anon");
 // logout表示用户登出功能的过滤器；调用指定的url会让已经登陆的用户退出
        filterChainDefinitionMap.put("/logout", "logout");
 // authc过滤器表示对应的url都需要权限验证才能访问
        filterChainDefinitionMap.put("/**", "authc");
        shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
 // 配置用户登陆的url。调用该接口需要传username和password字段。
        shiroFilterFactoryBean.setLoginUrl("/login");
 // 登陆成功自动跳转页面
        shiroFilterFactoryBean.setSuccessUrl("/index");
        return shiroFilterFactoryBean;
    }

    @Bean
    public DefaultWebSecurityManager securityManager() {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(userRealm());
        return securityManager;
    }

    @Bean
    public Realm userRealm() {
        UserRealm userRealm = new UserRealm();
//        userRealm.setCredentialsMatcher(credentialsMatcher());
        return userRealm;
    }

}
