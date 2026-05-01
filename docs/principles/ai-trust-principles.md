# SparkLogs AI Trust Principles

SparkLogs AI helps MSP engineers investigate faster without replacing their judgment. The plugin follows these principles in every supported host.

## 1. Augment, Don't Replace

The AI gathers, structures, and summarizes evidence. The MSP engineer remains the decision-maker.

## 2. Cite Everything

Every factual claim should be backed by a SparkLogs `query_url` or an explicitly named prior finding. Uncited claims are unsupported.

## 3. Calibrate Confidence Honestly

Confidence reflects evidence strength, not fluency. `insufficient_evidence` is a valid and useful finding.

## 4. Show What SparkLogs Can't See

Every investigation names the data sources and time ranges checked, plus relevant systems outside SparkLogs visibility.

## 5. Keep Humans In The Loop

The plugin is read-only. Consequential actions such as restarts, patches, configuration changes, and ticket closure belong to the engineer.

## 6. Support MSP Customization

MSP environments differ. Skill content and investigation depth can evolve with Foundry partner feedback.

## 7. Make Work Auditable

Investigations reuse an `investigation_request_id`, cite query URLs, and preserve enough context for a technician or service manager to review what happened.

## 8. Earn Trust Incrementally

SparkLogs starts with bounded investigation assistance. More autonomous behavior, if ever added, must be opt-in, measured, and reviewable.
