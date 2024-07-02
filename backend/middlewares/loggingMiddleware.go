package middlewares

import (
    "net/http"
    "time"
    "github.com/sirupsen/logrus"
)

// LoggingMiddleware logs each request with details such as method, path, status, and execution time
func LoggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        logrus.Infof("Started %s %s", r.Method, r.URL.Path)

        // Wrap the ResponseWriter to capture the status code
        lrw := &loggingResponseWriter{w, http.StatusOK}
        next.ServeHTTP(lrw, r)

        duration := time.Since(start)
        logrus.Infof("Completed %s %s in %v with status %d", r.Method, r.URL.Path, duration, lrw.statusCode)
    })
}

type loggingResponseWriter struct {
    http.ResponseWriter
    statusCode int
}

func (lrw *loggingResponseWriter) WriteHeader(code int) {
    lrw.statusCode = code
    lrw.ResponseWriter.WriteHeader(code)
}
