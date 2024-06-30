export default class Tracker {
  axiom;
  Tracker() {
    axiom = new Axiom({
      token: process.env.AXIOM_TOKEN,
      orgId: process.env.AXIOM_ORGID,
    });
  }

  async trackEvent(data) {
    axiom.ingest(process.env.AXIOM_DATASET, data);
    await axiom.flush();
  }
}
