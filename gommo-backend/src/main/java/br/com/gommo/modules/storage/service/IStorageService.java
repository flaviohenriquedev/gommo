package br.com.gommo.modules.storage.service;

import br.com.gommo.modules.storage.dto.StorageObjectLinkResponseDto;
import br.com.gommo.modules.storage.dto.StorageObjectResponseDto;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;

public interface IStorageService {

    StorageObjectResponseDto upload(MultipartFile file);

    StorageObjectLinkResponseDto linkToEntity(
            String entityType, UUID entityId, UUID objectId, String linkRole, String displayName);

    List<StorageObjectLinkResponseDto> listByEntity(String entityType, UUID entityId);

    InputStream download(UUID objectId);

    StorageObjectResponseDto findObject(UUID objectId);

    void delete(UUID objectId);
}
