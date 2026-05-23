/**
 * Padrão global de dados
 *
 * 1) Server (await no RSC):
 *    <DataRequest request={fetchFn}>{(data) => <View data={data} />}</DataRequest>
 *
 * 2) Server + use() (streaming):
 *    <Suspense fallback={<Skeleton />}>
 *      <PersonAsyncSection promise={fetchFn()} />
 *    </Suspense>
 *
 * 3) Client + React Query:
 *    <QueryPanel queryKey={keys} request={fetchFn}>{({ data }) => <View data={data} />}</QueryPanel>
 */

export {DataRequest} from "@/shared/components/data/DataRequest";
export {AsyncResult, useAsyncData} from "@/shared/components/data/DataResult";
export {QueryPanel, type QueryPanelRenderProps} from "@/shared/components/data/QueryPanel";
