package lib.minio;

// import com.mochrizki.foodorder.dto.request.CreateRecipeRequest;
// import com.mochrizki.foodorder.dto.request.UpdateRecipeRequest;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.*;
import io.minio.http.Method;
import lib.i18n.utility.MessageUtil;
import lib.minio.configuration.property.MinioProp;
import lib.minio.exception.MinioServiceDownloadException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class MinioSrvc {

  public static final Long DEFAULT_EXPIRY = TimeUnit.HOURS.toSeconds(1);

  private final MinioClient minio;
  private final MinioProp prop;

  private final MessageUtil message;

  private static String bMsg(String bucket) {
    return "bucket " + bucket;
  }

  private static String bfMsg(String bucket, String filename) {
    return bMsg(bucket) + " of file " + filename;
  }

  public String getLink(String filename, Long expiry) {
    try {
      return minio.getPresignedObjectUrl(
          GetPresignedObjectUrlArgs.builder()
              .method(Method.GET)
              .bucket(prop.getBucketName())
              .object(filename)
              .expiry(Math.toIntExact(expiry), TimeUnit.SECONDS)
              .build());
    } catch (InvalidKeyException | ErrorResponseException | InsufficientDataException | InternalException
        | InvalidResponseException | NoSuchAlgorithmException | XmlParserException | ServerException
        | IllegalArgumentException | IOException e) {
      log.error(message.get(prop.getGetErrorMessage(), bfMsg(prop.getBucketName(), filename)) + ": "
          + e.getLocalizedMessage(), e);
      throw new MinioServiceDownloadException(
          message.get(prop.getGetErrorMessage(), bfMsg(prop.getBucketName(), filename)), e);
    }
  }

  public String getPublicLink(String filename) {
    return this.getLink(filename, DEFAULT_EXPIRY);
  }

  private String sanitizeForFilename(String input) {
    return input.replaceAll("[^a-zA-Z0-9]", "_");
  }

  private String getFileExtension(String filename) {
    int dotIndex = filename.lastIndexOf('.');
    return (dotIndex == -1) ? "" : filename.substring(dotIndex);
  }

  // public String uploadImageToMinio(CreateRecipeRequest request, MultipartFile
  // imageFile) throws IOException {
  // String recipeName = sanitizeForFilename(request.getRecipeName());
  // String categoryName =
  // sanitizeForFilename(request.getCategories().getCategoryName());
  // String levelName = sanitizeForFilename(request.getLevels().getLevelName());

  // if (recipeName.isEmpty() || categoryName.isEmpty() || levelName.isEmpty()) {
  // log.warn("One or more components for filename are empty. Recipe: {},
  // Category: {}, Level: {}",
  // request.getRecipeName(), request.getCategories().getCategoryName(),
  // request.getLevels().getLevelName());
  // }

  // String timestamp = String.valueOf(System.currentTimeMillis());
  // String fileExtension = getFileExtension(imageFile.getOriginalFilename());

  // String generatedFilename = String.format(
  // "%s_%s_%s_%s%s",
  // recipeName,
  // categoryName,
  // levelName,
  // timestamp,
  // fileExtension);

  // try (InputStream inputStream = imageFile.getInputStream()) {
  // minio.putObject(
  // PutObjectArgs.builder()
  // .bucket(prop.getBucketName())
  // .object(generatedFilename)
  // .stream(inputStream, imageFile.getSize(), -1)
  // .contentType(imageFile.getContentType())
  // .build());
  // } catch (Exception e) {
  // throw new IOException("Failed to upload image to MinIO", e);
  // }

  // log.info(generatedFilename);
  // return generatedFilename;
  // }

  // public String updateImageToMinio(UpdateRecipeRequest request, MultipartFile
  // imageFile) throws IOException {
  // String recipeName = sanitizeForFilename(request.getRecipeName());
  // String categoryName =
  // sanitizeForFilename(request.getCategories().getCategoryName());
  // String levelName = sanitizeForFilename(request.getLevels().getLevelName());

  // if (recipeName.isEmpty() || categoryName.isEmpty() || levelName.isEmpty()) {
  // log.warn("One or more components for filename are empty. Recipe: {},
  // Category: {}, Level: {}",
  // request.getRecipeName(), request.getCategories().getCategoryName(),
  // request.getLevels().getLevelName());
  // }

  // String timestamp = String.valueOf(System.currentTimeMillis());
  // String fileExtension = getFileExtension(imageFile.getOriginalFilename());

  // String generatedFilename = String.format(
  // "%s_%s_%s_%s%s",
  // recipeName,
  // categoryName,
  // levelName,
  // timestamp,
  // fileExtension);

  // try (InputStream inputStream = imageFile.getInputStream()) {
  // minio.putObject(
  // PutObjectArgs.builder()
  // .bucket(prop.getBucketName())
  // .object(generatedFilename)
  // .stream(inputStream, imageFile.getSize(), -1)
  // .contentType(imageFile.getContentType())
  // .build());
  // } catch (Exception e) {
  // throw new IOException("Failed to upload image to MinIO", e);
  // }

  // log.info(generatedFilename);
  // return generatedFilename;
  // }
  // }
}