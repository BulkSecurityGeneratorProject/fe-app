package com.neighboorhood.feapp.repository.search;

import com.neighboorhood.feapp.domain.Images;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Images} entity.
 */
public interface ImagesSearchRepository extends ElasticsearchRepository<Images, String> {
}
