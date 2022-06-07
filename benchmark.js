import { check } from 'k6';
import http from 'k6/http';

const config = JSON.parse(open(__ENV.CONFIG_FILE));

export const handleSummary = (data) => {
    const failedRate = {
        data: data.metrics.http_req_failed.values.rate,
        comment: "Rate of failed requests"
    }

    const requestRate = {
        data: data.metrics.http_reqs.values.rate,
        comment: "Number of requests per second"
    }

    const avgRequestDuration = {
        data: data.metrics.iteration_duration.values.avg,
        comment: "Average duration to make a request and receive it"
    }

    const maxRequestDuration = {
        data: data.metrics.iteration_duration.values.max,
        comment: "Maximum duration to make a request and receive it"
    }

    const minRequestDuration = {
        data: data.metrics.iteration_duration.values.min,
        comment: "Minimum duration to make a request and receive it"
    }

    const numberOfUsers = {
        data: data.metrics.vus_max.values.value,
        comment: "Number of simulated users"
    }

    const testDuration = {
        data: data.state.testRunDurationMs,
        comment: "Total duration of test"
    }

    const exportObject = {
        testDuration,
        numberOfUsers,
        requestRate,
        failedRate,
        avgRequestDuration,
        maxRequestDuration,
        minRequestDuration
    }

    return {[config[__ENV.CONTEXT].output]: JSON.stringify(exportObject)}
}

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus: 1,
    duration: '10s'
}


export default () => {
    const res = http.get(config[__ENV.CONTEXT].url);

    const checkOutput = check(res, {
        'response code was 200': (res) => res.status == 200,
    });

    if (!checkOutput) {
        fail('unexpected response')
    }
}