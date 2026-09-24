# Merge Broker agent contract

This repository coordinates parallel work with Agent Merge Broker.

1. Claim a task and declare the smallest accurate path scope before editing:
   `merge-broker task claim <task-id> --holder <agent> --path 'src/area/**'`
2. Heartbeat long-running work with `merge-broker task heartbeat <task-id>`. The broker holds the
   lease token for you; pass `--token` only when working from another machine.
3. Work only inside the declared scope. Coordinate a new claim before expanding it.
4. Commit the focused change. Agents do not merge, rebase, push, or administer branches.
5. Nominate immutable commits as a candidate for broker integration:
   `merge-broker task candidate <task-id> --since-base`
   Candidate nomination never authorizes merging.
6. If verification requests changes, acquire a revision lease with
   `merge-broker task reopen <task-id>`, commit the fix, then run
   `merge-broker task revise <task-id> --since-base`. The existing pull request is updated and all
   evidence for the earlier SHA is invalidated.
7. Report the task ID, commit SHA, changed paths, and validation performed.

The broker owns integration ordering, conflict resolution requests, validation, batching, and publication.
