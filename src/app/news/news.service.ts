import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NewsArticle } from './news.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = '8957923bc16d4e4db92d52c0bde915fe';
  private apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + this.apiKey;

  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsArticle[]> {
    return this.http.get(this.apiUrl).pipe(
      map((response: any) => {
        if (response && response.articles) {
          return response.articles.map((article: any, index: number) => ({
            id: index + 1,
            title: article.title || 'No title',
            description: article.description || 'No description',
            content: article.content || 'No content',
            url: article.url || '',
            publishedAt: article.publishedAt || new Date().toISOString(),
          }));
        } else {
          throw new Error('Invalid response format');
        }
      }),
      catchError(this.handleError)
    );
  }

  getNewsArticle(id: number): Observable<NewsArticle | undefined> {
    return this.getNews().pipe(
      map((articles) => articles.find((article) => article.id === id)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}