package br.com.gommo.modules.storage.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "gommo.storage")
public record StorageProperties(String localBasePath, String bucket) {}
