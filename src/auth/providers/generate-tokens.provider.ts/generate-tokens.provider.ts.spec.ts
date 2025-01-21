import { Test, TestingModule } from '@nestjs/testing';
import { GenerateTokensProviderTs } from './generate-tokens.provider.ts';

describe('GenerateTokensProviderTs', () => {
  let provider: GenerateTokensProviderTs;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateTokensProviderTs],
    }).compile();

    provider = module.get<GenerateTokensProviderTs>(GenerateTokensProviderTs);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
