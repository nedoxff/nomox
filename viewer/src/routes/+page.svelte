<script lang="ts">
    window.location.href = window.localStorage.getItem('auth') === null ? '/login': '/home';
</script>