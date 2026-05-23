package br.com.gommo.modules.person.repository;

import br.com.gommo.core.base.repository.IBaseRepository;
import br.com.gommo.modules.person.entity.Person;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends IBaseRepository<Person> {

    Optional<Person> findByCpfAndStatusNot(String cpf, br.com.gommo.core.entity.StatusEnum status);
}
