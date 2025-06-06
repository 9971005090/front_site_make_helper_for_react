
/**
 * 로딩 이미지 콤포넌트
 * @fileoverview
 * - 모든 컴포넌트가 다이나믹 임포트를 사용하기 때문에, 컴포넌트가 로딩되기 전까지 표시되는 작은 로딩 이미지 컴포넌트
 */

import React from "react";
import $ from "cash-dom";

const LoadingDonut = function() {
    const base64SVG =
        "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic3ZnLWljb24iIHN0eWxlPSJ3aWR0aDogMWVtOyBoZWlnaHQ6IDFlbTt2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO2ZpbGw6IGN1cnJlbnRDb2xvcjtvdmVyZmxvdzogaGlkZGVuOyIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik01MjMuMDg1OTM1IDEwMS44NDk0MDNtLTEwMS44NTA0MDMgMGExMDEuODUwNDAzIDEwMS44NTA0MDMgMCAxIDAgMjAzLjcwMDgwNiAwIDEwMS44NTA0MDMgMTAxLjg1MDQwMyAwIDEgMC0yMDMuNzAwODA2IDBaIiBmaWxsPSIjMDAwMDAwIiAvPjxwYXRoIGQ9Ik03NjkuODM2NDg5IDE4Ny41MDg5MDFtLTk2LjAzMTQzNyAwYTk2LjAzMTQzNyA5Ni4wMzE0MzcgMCAxIDAgMTkyLjA2Mjg3NSAwIDk2LjAzMTQzNyA5Ni4wMzE0MzcgMCAxIDAtMTkyLjA2Mjg3NSAwWiIgZmlsbD0iIzAwMDAwMCIgLz48cGF0aCBkPSJNOTAzLjI4NjcwNyAzODEuMzk1NzY1bS05MC4yMTA0NzEgMGE5MC4yMTA0NzEgOTAuMjEwNDcxIDAgMSAwIDE4MC40MjA5NDMgMCA5MC4yMTA0NzEgOTAuMjEwNDcxIDAgMSAwLTE4MC40MjA5NDMgMFoiIGZpbGw9IiMwMDAwMDAiIC8+PHBhdGggZD0iTTkwNS45NTA2OTIgNjA5LjcyMjQyN20tODQuMzkwNTA2IDBhODQuMzkwNTA2IDg0LjM5MDUwNiAwIDEgMCAxNjguNzgxMDExIDAgODQuMzkwNTA2IDg0LjM5MDUwNiAwIDEgMC0xNjguNzgxMDExIDBaIiBmaWxsPSIjMDAwMDAwIiAvPjxwYXRoIGQ9Ik03OTkuOTk3MzEzIDc4Ni4xMjczOTRtLTc4LjU3MDU0IDBhNzguNTcwNTQgNzguNTcwNTQgMCAxIDAgMTU3LjE0MTA3OSAwIDc4LjU3MDU0IDc4LjU3MDU0IDAgMSAwLTE1Ny4xNDEwNzkgMFoiIGZpbGw9IiMwMDAwMDAiIC8+PHBhdGggZD0iTTYwNS4xOTY0NTQgODg5LjcwODc4N20tNzIuNzUwNTc0IDBhNzIuNzUwNTc0IDcyLjc1MDU3NCAwIDEgMCAxNDUuNTAxMTQ4IDAgNzIuNzUwNTc0IDcyLjc1MDU3NCAwIDEgMC0xNDUuNTAxMTQ4IDBaIiBmaWxsPSIjMDAwMDAwIiAvPjxwYXRoIGQ9Ik0zOTcuMTQ4NjczIDg3Ny44NTc4NTZtLTY2LjkzMTYwOCAwYTY2LjkzMTYwOCA2Ni45MzE2MDggMCAxIDAgMTMzLjg2MzIxNiAwIDY2LjkzMTYwOCA2Ni45MzE2MDggMCAxIDAtMTMzLjg2MzIxNiAwWiIgZmlsbD0iIzAwMDAwMCIgLz48cGF0aCBkPSJNMjIzLjY2NTY4OSA3NjIuNDgzNTMybS02MS4xMTA2NDEgMGE2MS4xMTA2NDIgNjEuMTEwNjQyIDAgMSAwIDEyMi4yMjEyODMgMCA2MS4xMTA2NDIgNjEuMTEwNjQyIDAgMSAwLTEyMi4yMjEyODMgMFoiIGZpbGw9IiMwMDAwMDAiIC8+PHBhdGggZD0iTTEzNC40ODMyMTIgNTg3LjE0ODU2bS01NS4yOTA2NzYgMGE1NS4yOTA2NzYgNTUuMjkwNjc2IDAgMSAwIDExMC41ODEzNTIgMCA1NS4yOTA2NzYgNTUuMjkwNjc2IDAgMSAwLTExMC41ODEzNTIgMFoiIGZpbGw9IiMwMDAwMDAiIC8+PHBhdGggZD0iTTEzNS4zOTYyMDcgNDA4Ljg5NjYwNG0tNDkuNDcwNzEgMGE0OS40NzA3MSA0OS40NzA3MSAwIDEgMCA5OC45NDE0MiAwIDQ5LjQ3MDcxIDQ5LjQ3MDcxIDAgMSAwLTk4Ljk0MTQyIDBaIiBmaWxsPSIjMDAwMDAwIiAvPjxwYXRoIGQ9Ik0yMDUuMzM2Nzk3IDI2MC4wNDc0NzZtLTQzLjY1MDc0NCAwYTQzLjY1MDc0NCA0My42NTA3NDQgMCAxIDAgODcuMzAxNDg4IDAgNDMuNjUwNzQ0IDQzLjY1MDc0NCAwIDEgMC04Ny4zMDE0ODggMFoiIGZpbGw9IiMwMDAwMDAiIC8+PHBhdGggZD0iTTMxNS44MTUxNSAxNTkuOTkwMDYzbS0zNy44Mjk3NzkgMGEzNy44Mjk3NzggMzcuODI5Nzc4IDAgMSAwIDc1LjY1OTU1NyAwIDM3LjgyOTc3OCAzNy44Mjk3NzggMCAxIDAtNzUuNjU5NTU3IDBaIiBmaWxsPSIjMDAwMDAwIiAvPjwvc3ZnPg==";

    // 스타일 정의
    const styles = {
        container: {
            width: "15px",
            height: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        donut: {
            width: "15px",
            height: "15px",
            animation: "rotate 1.5s linear infinite",
        },
    };

    return (
        <div style={styles.container}>
            <img src={base64SVG} alt="rotating-donut" style={styles.donut} />
        </div>
    );
};

// 글로벌 CSS 애니메이션 추가
$(`<style>`).html(`
    @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`).appendTo(`head`);

export { LoadingDonut };
