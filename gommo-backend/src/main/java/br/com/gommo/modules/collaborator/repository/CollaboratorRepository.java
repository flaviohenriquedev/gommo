package br.com.gommo.modules.collaborator.repository;

import br.com.gommo.core.base.repository.IBaseRepository;
import br.com.gommo.modules.collaborator.entity.Collaborator;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface CollaboratorRepository extends IBaseRepository<Collaborator> {

    Optional<Collaborator> findByCpfAndStatusNot(String cpf, br.com.gommo.core.entity.StatusEnum status);
}
