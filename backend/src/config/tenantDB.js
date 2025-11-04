import mongoose from "mongoose";

const tenantConnections = {}; // cache

export const getTenantConnection = async (orgId) => {
  if (!orgId) throw new Error("orgId required for tenant connection");

  if (tenantConnections[orgId]) return tenantConnections[orgId];

  const dbName = `talentflow_org_${orgId}`;
  const uriBase = process.env.MONGO_CLUSTER_URI; 
  const tenantUri = `${uriBase}/${dbName}?retryWrites=true&w=majority`;

  const conn = await mongoose.createConnection(tenantUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  tenantConnections[orgId] = conn;
  console.log(`🔗 Connected tenant DB: ${dbName}`);
  return conn;
};
