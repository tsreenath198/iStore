package com.istore.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
// @PropertySource("bootstrap.properties")
public class DataSourceConfig {

	@Value("${spring.datasource.driver}")
	String sourceSysDriverClassName;

	@Value("${spring.datasource.url}")
	String sourceSysDataSourceUrl;

	@Value("${spring.datasource.username}")
	String sourceSysDatasourceUserName;

	@Value("${spring.datasource.password}")
	String sourceSysDatasourcePassword;

	@Bean
	public DataSource mysqlDataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(sourceSysDriverClassName);
		dataSource.setUrl(sourceSysDataSourceUrl);
		dataSource.setUsername(sourceSysDatasourceUserName);
		dataSource.setPassword(sourceSysDatasourcePassword);

		return dataSource;
	}

	@Bean(name = "sourceSysJDBCTemplate")
	public NamedParameterJdbcTemplate getSourceJDBCTemplate() {
		return new NamedParameterJdbcTemplate(mysqlDataSource());
	}

	@Bean(name = "jdbcTemplate")
	public JdbcTemplate getJDBCTemplate() {
		return new JdbcTemplate(mysqlDataSource());
	}

}
