export default function requireAsyncProperty({types: t, template}) {

  const tracking = template.ast(`
    const key = this.resolve(props)
    this.loading[key] = true
    return this.importAsync(props).then(resolved => {
     this.loading[key] = false;
     return resolved;
    });        
  `);

  return () =>
    t.objectMethod(
      'method',
      t.identifier('requireAsync'),
      [t.identifier('props')],
      t.blockStatement(tracking),
    )
}
