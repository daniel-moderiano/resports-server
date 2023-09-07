Current development progress

- `resports-aws-cdk` is currently in a completed state, but the NAT instance is shut down to save costs. This does NOT require any further development at this point
- `resports-client` is currently configured to send requests to the AWS endpoints. This should be adjusted in `resports-server`. Mutation queries exist for all API operations already. No further development is needed FOR NOW, but will be required after `resports-server` is operational
- `resports-server` is currently being switched to MongoDB, with the intention of getting it up and running on `cyclic` or similar (free AWS alternative). The current state is making sure the mongo queries work correctly. Note finished, working versions of these queries exist in `resports-aws-cdk`. The safe removal of all Postgres code is also currently required, including old tests. Testing code exists in `resports-aws-cdk`
