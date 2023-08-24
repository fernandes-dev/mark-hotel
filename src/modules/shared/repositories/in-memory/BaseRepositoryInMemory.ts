export class BaseRepositoryInMemory {
  public incrementalID(repositoryName: string) {
    return (
      (this[repositoryName]?.[this[repositoryName]?.length - 1]?.id ?? 0) + 1
    )
  }

  public removeUndefinedFromDTO(
    data: Record<string, unknown>
  ): Record<string, unknown> {
    const newValue = { ...data }

    // remove undefined values
    Object.entries(newValue).forEach(([key, value]) => {
      if (value === undefined) Reflect.deleteProperty(newValue, key)
    })

    return newValue
  }
}
