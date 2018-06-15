package com.mbgarage.rpt.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.mbgarage.rpt.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.PersistentToken.class.getName(), jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.User.class.getName() + ".persistentTokens", jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.UserExt.class.getName(), jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.UserExt.class.getName() + ".senderMessages", jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.UserExt.class.getName() + ".cars", jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.Restoration.class.getName(), jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.Restoration.class.getName() + ".repairs", jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.Repair.class.getName(), jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.Repair.class.getName() + ".subtasks", jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.Repair.class.getName() + ".photos", jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.SubTask.class.getName(), jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.Photo.class.getName(), jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.Car.class.getName(), jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.Car.class.getName() + ".restorations", jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.Message.class.getName(), jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.UserExt.class.getName() + ".queries", jcacheConfiguration);
            cm.createCache(com.mbgarage.rpt.domain.Car.class.getName() + ".photos", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
