package com.neighboorhood.feapp.repository.search;

import com.neighboorhood.feapp.domain.NGUser;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link NGUser} entity.
 */
public interface NGUserSearchRepository extends ElasticsearchRepository<NGUser, String> {
}
