// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  ListModelPackagesCommand,
  ListModelPackagesCommandInput,
  ListModelPackagesCommandOutput,
} from "../commands/ListModelPackagesCommand";
import { SageMakerClient } from "../SageMakerClient";
import { SageMakerPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: SageMakerClient,
  input: ListModelPackagesCommandInput,
  ...args: any
): Promise<ListModelPackagesCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListModelPackagesCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListModelPackages(
  config: SageMakerPaginationConfiguration,
  input: ListModelPackagesCommandInput,
  ...additionalArguments: any
): Paginator<ListModelPackagesCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListModelPackagesCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof SageMakerClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected SageMaker | SageMakerClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
