package br.com.gommo.modules.storage.repository;

import br.com.gommo.core.base.repository.IBaseRepository;
import br.com.gommo.modules.storage.entity.StorageObject;
import org.springframework.stereotype.Repository;

@Repository
public interface StorageObjectRepository extends IBaseRepository<StorageObject> {}
