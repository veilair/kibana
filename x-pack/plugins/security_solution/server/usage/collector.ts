/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { CollectorFetchContext } from '../../../../../src/plugins/usage_collection/server';
import type { CollectorDependencies } from './types';
import { getDetectionsMetrics } from './detections/get_metrics';
import { getInternalSavedObjectsClient } from './get_internal_saved_objects_client';

export type RegisterCollector = (deps: CollectorDependencies) => void;

export interface UsageData {
  detectionMetrics: {};
}

export const registerCollector: RegisterCollector = ({
  core,
  signalsIndex,
  ml,
  usageCollection,
  logger,
}) => {
  if (!usageCollection) {
    logger.debug('Usage collection is undefined, therefore returning early without registering it');
    return;
  }

  const collector = usageCollection.makeUsageCollector<UsageData>({
    type: 'security_solution',
    schema: {
      detectionMetrics: {
        detection_rules: {
          detection_rule_usage: {
            query: {
              enabled: { type: 'long', _meta: { description: 'Number of query rules enabled' } },
              disabled: { type: 'long', _meta: { description: 'Number of query rules disabled' } },
              alerts: {
                type: 'long',
                _meta: { description: 'Number of alerts generated by query rules' },
              },
              cases: {
                type: 'long',
                _meta: { description: 'Number of cases attached to query detection rule alerts' },
              },
              legacy_notifications_enabled: {
                type: 'long',
                _meta: { description: 'Number of legacy notifications enabled' },
              },
              legacy_notifications_disabled: {
                type: 'long',
                _meta: { description: 'Number of legacy notifications disabled' },
              },
              notifications_enabled: {
                type: 'long',
                _meta: { description: 'Number of notifications enabled' },
              },
              notifications_disabled: {
                type: 'long',
                _meta: { description: 'Number of notifications enabled' },
              },
            },
            threshold: {
              enabled: {
                type: 'long',
                _meta: { description: 'Number of threshold rules enabled' },
              },
              disabled: {
                type: 'long',
                _meta: { description: 'Number of threshold rules disabled' },
              },
              alerts: {
                type: 'long',
                _meta: { description: 'Number of alerts generated by threshold rules' },
              },
              cases: {
                type: 'long',
                _meta: {
                  description: 'Number of cases attached to threshold detection rule alerts',
                },
              },
              legacy_notifications_enabled: {
                type: 'long',
                _meta: { description: 'Number of legacy notifications enabled' },
              },
              legacy_notifications_disabled: {
                type: 'long',
                _meta: { description: 'Number of legacy notifications disabled' },
              },
              notifications_enabled: {
                type: 'long',
                _meta: { description: 'Number of notifications enabled' },
              },
              notifications_disabled: {
                type: 'long',
                _meta: { description: 'Number of notifications enabled' },
              },
            },
            eql: {
              enabled: { type: 'long', _meta: { description: 'Number of eql rules enabled' } },
              disabled: { type: 'long', _meta: { description: 'Number of eql rules disabled' } },
              alerts: {
                type: 'long',
                _meta: { description: 'Number of alerts generated by eql rules' },
              },
              cases: {
                type: 'long',
                _meta: { description: 'Number of cases attached to eql detection rule alerts' },
              },
              legacy_notifications_enabled: {
                type: 'long',
                _meta: { description: 'Number of legacy notifications enabled' },
              },
              legacy_notifications_disabled: {
                type: 'long',
                _meta: { description: 'Number of legacy notifications disabled' },
              },
              notifications_enabled: {
                type: 'long',
                _meta: { description: 'Number of notifications enabled' },
              },
              notifications_disabled: {
                type: 'long',
                _meta: { description: 'Number of notifications enabled' },
              },
            },
            machine_learning: {
              enabled: {
                type: 'long',
                _meta: { description: 'Number of machine_learning rules enabled' },
              },
              disabled: {
                type: 'long',
                _meta: { description: 'Number of machine_learning rules disabled' },
              },
              alerts: {
                type: 'long',
                _meta: { description: 'Number of alerts generated by machine_learning rules' },
              },
              cases: {
                type: 'long',
                _meta: {
                  description: 'Number of cases attached to machine_learning detection rule alerts',
                },
              },
              legacy_notifications_enabled: {
                type: 'long',
                _meta: { description: 'Number of legacy notifications enabled' },
              },
              legacy_notifications_disabled: {
                type: 'long',
                _meta: { description: 'Number of legacy notifications disabled' },
              },
              notifications_enabled: {
                type: 'long',
                _meta: { description: 'Number of notifications enabled' },
              },
              notifications_disabled: {
                type: 'long',
                _meta: { description: 'Number of notifications enabled' },
              },
            },
            threat_match: {
              enabled: {
                type: 'long',
                _meta: { description: 'Number of threat_match rules enabled' },
              },
              disabled: {
                type: 'long',
                _meta: { description: 'Number of threat_match rules disabled' },
              },
              alerts: {
                type: 'long',
                _meta: { description: 'Number of alerts generated by threat_match rules' },
              },
              cases: {
                type: 'long',
                _meta: {
                  description: 'Number of cases attached to threat_match detection rule alerts',
                },
              },
              legacy_notifications_enabled: {
                type: 'long',
                _meta: { description: 'Number of legacy notifications enabled' },
              },
              legacy_notifications_disabled: {
                type: 'long',
                _meta: { description: 'Number of legacy notifications disabled' },
              },
              notifications_enabled: {
                type: 'long',
                _meta: { description: 'Number of notifications enabled' },
              },
              notifications_disabled: {
                type: 'long',
                _meta: { description: 'Number of notifications enabled' },
              },
            },
            elastic_total: {
              enabled: { type: 'long', _meta: { description: 'Number of elastic rules enabled' } },
              disabled: {
                type: 'long',
                _meta: { description: 'Number of elastic rules disabled' },
              },
              alerts: {
                type: 'long',
                _meta: { description: 'Number of alerts generated by elastic rules' },
              },
              cases: {
                type: 'long',
                _meta: { description: 'Number of cases attached to elastic detection rule alerts' },
              },
              legacy_notifications_enabled: {
                type: 'long',
                _meta: { description: 'Number of legacy notifications enabled' },
              },
              legacy_notifications_disabled: {
                type: 'long',
                _meta: { description: 'Number of legacy notifications disabled' },
              },
              notifications_enabled: {
                type: 'long',
                _meta: { description: 'Number of notifications enabled' },
              },
              notifications_disabled: {
                type: 'long',
                _meta: { description: 'Number of notifications enabled' },
              },
            },
            custom_total: {
              enabled: { type: 'long', _meta: { description: 'Number of custom rules enabled' } },
              disabled: { type: 'long', _meta: { description: 'Number of custom rules disabled' } },
              alerts: {
                type: 'long',
                _meta: { description: 'Number of alerts generated by custom rules' },
              },
              cases: {
                type: 'long',
                _meta: { description: 'Number of cases attached to custom detection rule alerts' },
              },
              legacy_notifications_enabled: {
                type: 'long',
                _meta: { description: 'Number of legacy notifications enabled' },
              },
              legacy_notifications_disabled: {
                type: 'long',
                _meta: { description: 'Number of legacy notifications disabled' },
              },
              notifications_enabled: {
                type: 'long',
                _meta: { description: 'Number of notifications enabled' },
              },
              notifications_disabled: {
                type: 'long',
                _meta: { description: 'Number of notifications enabled' },
              },
            },
          },
          detection_rule_detail: {
            type: 'array',
            items: {
              rule_name: {
                type: 'keyword',
                _meta: { description: 'The name of the detection rule' },
              },
              rule_id: {
                type: 'keyword',
                _meta: { description: 'The UUID id of the detection rule' },
              },
              rule_type: {
                type: 'keyword',
                _meta: { description: 'The type of detection rule. ie eql, query...' },
              },
              rule_version: { type: 'long', _meta: { description: 'The version of the rule' } },
              enabled: {
                type: 'boolean',
                _meta: { description: 'If the detection rule has been enabled by the user' },
              },
              elastic_rule: {
                type: 'boolean',
                _meta: { description: 'If the detection rule has been authored by Elastic' },
              },
              created_on: {
                type: 'keyword',
                _meta: { description: 'When the detection rule was created on the cluster' },
              },
              updated_on: {
                type: 'keyword',
                _meta: { description: 'When the detection rule was updated on the cluster' },
              },
              alert_count_daily: {
                type: 'long',
                _meta: { description: 'The number of daily alerts generated by a rule' },
              },
              cases_count_total: {
                type: 'long',
                _meta: { description: 'The number of total cases generated by a rule' },
              },
              has_legacy_notification: {
                type: 'boolean',
                _meta: { description: 'True if this rule has a legacy notification' },
              },
              has_notification: {
                type: 'boolean',
                _meta: { description: 'True if this rule has a notification' },
              },
            },
          },
        },
        ml_jobs: {
          ml_job_usage: {
            custom: {
              enabled: {
                type: 'long',
                _meta: { description: 'The number of custom ML jobs rules enabled' },
              },
              disabled: {
                type: 'long',
                _meta: { description: 'The number of custom ML jobs rules disabled' },
              },
            },
            elastic: {
              enabled: {
                type: 'long',
                _meta: { description: 'The number of elastic provided ML jobs rules enabled' },
              },
              disabled: {
                type: 'long',
                _meta: { description: 'The number of elastic provided ML jobs rules disabled' },
              },
            },
          },
          ml_job_metrics: {
            type: 'array',
            items: {
              job_id: {
                type: 'keyword',
                _meta: { description: 'Identifier for the anomaly detection job' },
              },
              open_time: {
                type: 'keyword',
                _meta: {
                  description:
                    'For open jobs only, the elapsed time for which the job has been open',
                },
              },
              create_time: {
                type: 'keyword',
                _meta: { description: 'The time the job was created' },
              },
              finished_time: {
                type: 'keyword',
                _meta: {
                  description: 'If the job closed or failed, this is the time the job finished',
                },
              },
              state: {
                type: 'keyword',
                _meta: { description: 'The status of the anomaly detection job' },
              },
              data_counts: {
                bucket_count: {
                  type: 'long',
                  _meta: { description: 'The number of buckets processed' },
                },
                empty_bucket_count: {
                  type: 'long',
                  _meta: { description: 'The number of buckets which did not contain any data' },
                },
                input_bytes: {
                  type: 'long',
                  _meta: {
                    description:
                      'The number of bytes of input data posted to the anomaly detection job',
                  },
                },
                input_record_count: {
                  type: 'long',
                  _meta: {
                    description:
                      'The number of input documents posted to the anomaly detection job',
                  },
                },
                last_data_time: {
                  type: 'long',
                  _meta: {
                    description:
                      'The timestamp at which data was last analyzed, according to server time',
                  },
                },
                processed_record_count: {
                  type: 'long',
                  _meta: {
                    description:
                      'The number of input documents that have been processed by the anomaly detection job',
                  },
                },
              },
              model_size_stats: {
                bucket_allocation_failures_count: {
                  type: 'long',
                  _meta: {
                    description:
                      'The number of buckets for which new entities in incoming data were not processed due to insufficient model memory',
                  },
                },
                model_bytes: {
                  type: 'long',
                  _meta: { description: 'The number of bytes of memory used by the models' },
                },
                model_bytes_exceeded: {
                  type: 'long',
                  _meta: {
                    description:
                      'The number of bytes over the high limit for memory usage at the last allocation failure',
                  },
                },
                model_bytes_memory_limit: {
                  type: 'long',
                  _meta: {
                    description:
                      'The upper limit for model memory usage, checked on increasing values',
                  },
                },
                peak_model_bytes: {
                  type: 'long',
                  _meta: {
                    description: 'The peak number of bytes of memory ever used by the models',
                  },
                },
              },
              timing_stats: {
                bucket_count: {
                  type: 'long',
                  _meta: { description: 'The number of buckets processed' },
                },
                exponential_average_bucket_processing_time_ms: {
                  type: 'long',
                  _meta: {
                    description:
                      'Exponential moving average of all bucket processing times, in milliseconds',
                  },
                },
                exponential_average_bucket_processing_time_per_hour_ms: {
                  type: 'long',
                  _meta: {
                    description:
                      'Exponentially-weighted moving average of bucket processing times calculated in a 1 hour time window, in milliseconds',
                  },
                },
                maximum_bucket_processing_time_ms: {
                  type: 'long',
                  _meta: {
                    description: 'Maximum among all bucket processing times, in milliseconds',
                  },
                },
                minimum_bucket_processing_time_ms: {
                  type: 'long',
                  _meta: {
                    description: 'Minimum among all bucket processing times, in milliseconds',
                  },
                },
                total_bucket_processing_time_ms: {
                  type: 'long',
                  _meta: { description: 'Sum of all bucket processing times, in milliseconds' },
                },
              },
              datafeed: {
                datafeed_id: {
                  type: 'keyword',
                  _meta: {
                    description:
                      'A numerical character string that uniquely identifies the datafeed',
                  },
                },
                state: {
                  type: 'keyword',
                  _meta: { description: 'The status of the datafeed' },
                },
                timing_stats: {
                  average_search_time_per_bucket_ms: {
                    type: 'long',
                    _meta: { description: 'The average search time per bucket, in milliseconds' },
                  },
                  bucket_count: {
                    type: 'long',
                    _meta: { description: 'The number of buckets processed' },
                  },
                  exponential_average_search_time_per_hour_ms: {
                    type: 'long',
                    _meta: {
                      description: 'The exponential average search time per hour, in milliseconds',
                    },
                  },
                  search_count: {
                    type: 'long',
                    _meta: { description: 'The number of searches run by the datafeed' },
                  },
                  total_search_time_ms: {
                    type: 'long',
                    _meta: {
                      description: 'The total time the datafeed spent searching, in milliseconds',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    isReady: () => true,
    fetch: async ({ esClient }: CollectorFetchContext): Promise<UsageData> => {
      const savedObjectsClient = await getInternalSavedObjectsClient(core);
      const detectionMetrics = await getDetectionsMetrics({
        signalsIndex,
        esClient,
        savedObjectsClient,
        logger,
        mlClient: ml,
      });
      return {
        detectionMetrics: detectionMetrics || {},
      };
    },
  });

  usageCollection.registerCollector(collector);
};
