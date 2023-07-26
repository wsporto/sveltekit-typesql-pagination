<script lang="ts">
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";
    import { LightPaginationNav } from "svelte-paginate";
    export let data: PageData;
</script>

<main class="container">
    <h1>Pagination with SvelteKit and TypeSQL</h1>
    <LightPaginationNav
        totalItems={data.total}
        pageSize={data.pageSize}
        currentPage={data.page}
        limit={4}
        showStepOptions={true}
        on:setPage={(e) => {
            goto(`?page=${e.detail.page}`);
        }}
    />
    <table role="grid">
        <thead>
            <tr>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
            </tr>
        </thead>
        <tbody>
            {#each data.products as product}
                <tr>
                    <td>{product.productCode}</td>
                    <td>{product.productName}</td>
                    <td>{product.productDescription}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>
