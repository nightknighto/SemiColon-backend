
{{- define "base-name" }}
{{- .Release.Name }}
{{- end -}}

{{- define "app-name"}}
{{- include "base-name" . }}-app
{{- end }}

{{- define "db-name" }}
{{- include "base-name" . }}-db
{{- end }}

{{- define "app-labels" -}}
app: {{ .Release.Name }}
type: backend
{{- end -}}

{{- define "db-labels" -}}
app: {{ .Release.Name }}
type: database
{{- end -}}

