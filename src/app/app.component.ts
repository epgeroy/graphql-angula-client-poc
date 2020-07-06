import { Component, OnInit } from '@angular/core';
import { HttpLink } from 'apollo-angular-link-http';
import { Apollo } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular';

  constructor(private apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri:
          'https://api-us-east-1.graphcms.com/v2/ckc9t5wsh01mi01wjfnxnfmho/master',
      }),
      cache: new InMemoryCache(),
    });
  }
  ngOnInit(): void {
    this.apollo
      .query({
        query: gql`
        query AllProducts {
            products {
                id
                name
                description {
                    html
                }
            }
        }`,
      })
      .subscribe((result) => {
        console.log(result);
      });
  }
}

export type Product = {
  id: string;
  name: string;
  description: RichText;
};

export type RichText = {
  html: string;
};
