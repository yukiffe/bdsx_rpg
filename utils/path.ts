class Path {
  public DATABASE = "../database";
  public DATABASE_PLAYER = `${this.DATABASE}/player`;
  public PLUGIN = "../plugin";
  public PLUGIN_UTILS = `${this.PLUGIN}/utils`;
  public PLUGIN_UTILS_DATABASE = `${this.PLUGIN_UTILS}/comprehensive_database`;
}
export const path = new Path();
