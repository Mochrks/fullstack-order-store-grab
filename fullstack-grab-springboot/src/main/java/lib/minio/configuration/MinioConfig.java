package lib.minio.configuration;

import io.minio.MinioClient;
import lib.minio.configuration.property.MinioProp;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioConfig {
  @Bean
  public MinioClient minioClient(MinioProp props) {
    return MinioClient.builder()
        .endpoint(props.getUrl())
        .credentials(props.getUsername(), props.getPassword())
        .build();
  }
}
