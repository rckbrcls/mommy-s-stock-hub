// Mock para o WatermelonDB para testes automatizados
module.exports = {
  Database: jest.fn().mockImplementation(() => ({
    collections: {},
  })),
  Q: jest.fn(),
  tableSchema: jest.fn(),
  appSchema: jest.fn(),
  field: jest.fn(),
  relation: jest.fn(),
  text: jest.fn(),
  date: jest.fn(),
  readonly: jest.fn(),
  writer: jest.fn(),
  Model: class {},
  Collection: class {},
  database: {},
};
